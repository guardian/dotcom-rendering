
# See it in action https://fiddle.fastly.dev/fiddle/47149485
# This VCL code is an example of how to implement dynamic client and server A/B testing using Fastly's Varnish Configuration Language (VCL).

  # our mvt space and which test groups are occupying it
table mvt_ab_test_groups {
  "mvt0": "0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control",
  "mvt1": "0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant",
}

# This table contains the active A/B test groups and their parameters
table active_ab_test_groups {
  "commercial-ad-block-ask:control": "exp=1745971200,type=client",
  "commercial-ad-block-ask:variant": "exp=1745971200,type=client",
  "commercial-some-100-perc-test:control": "exp=1745971200,type=server",
  "commercial-some-100-perc-test:variant": "exp=1745971200,type=server"
}

# subroutine to check if there is a test for the mvt id and test number
sub check_active_test_group {

  declare local var.test_id STRING;
  declare local var.test_params STRING;

  set var.test_id = subfield(req.http.x-current-mvt-tests, req.http.x-current-test-index);

  if(var.test_id && table.contains(active_ab_test_groups, var.test_id)) {
    log "Found ab test using MVT ID, named " + var.test_id;

    set var.test_params = table.lookup(active_ab_test_groups, var.test_id);

    log "Test Params: " var.test_params;

    log "Test Expiry: " std.time(subfield(var.test_params, "exp"), std.integer2time(0));

    if(var.test_id && time.is_after(std.time(subfield(var.test_params, "exp"), std.integer2time(0)), now)) {
      log "Test is not expired";
      if(subfield(var.test_params, "type") == "server") {
        set req.http.x-server-ab-tests = req.http.x-server-ab-tests + if(req.http.x-server-ab-tests == "", "", ",") + var.test_id;
      } else {
        set req.http.x-client-ab-tests = req.http.x-client-ab-tests + if(req.http.x-client-ab-tests == "", "", ",") + var.test_id;
      }
    }
  }

}

vcl_recv {

  # Get or generate MVTID
  # only 100 test buckets are available so only integer test varaints are supported
  if (req.http.Cookie:MVT_id) {
      set req.http.X-mvt-id = std.atoi(req.http.Cookie:MVT_id);
  } else {
      set req.http.X-mvt-id = randomint(0, 99);
  }

  # fresh slate
  set req.http.x-client-ab-tests = "";
  set req.http.x-server-ab-tests = "";

  if(table.contains(mvt_ab_test_groups, "mvt" + req.http.X-mvt-id)) {
    log "Found entry for MVTID " + req.http.X-mvt-id;
    set req.http.x-current-mvt-tests = table.lookup(mvt_ab_test_groups,  "mvt" + req.http.X-mvt-id);

    # vcl doesn't support arrays or loops so we have to do this manually
    # we can have a maximum of 3 tests per MVTID, can be increased by
    # changing the number of times we call check_active_test_group here
    set req.http.x-current-test-index = "0";
    call check_active_test_group;

    set req.http.x-current-test-index = "1";
    call check_active_test_group;

    set req.http.x-current-test-index = "2";
    call check_active_test_group;
  }

  unset req.http.x-current-test-index;

  declare local var.forced_test_params STRING;

  # force me into a test
  if(req.http.Cookie:force_test) {
    if(table.contains(active_ab_test_groups, req.http.Cookie:force_test)) {
      log "Forcing test: " + req.http.Cookie:force_test;
      set var.forced_test_params = table.lookup(active_ab_test_groups, req.http.Cookie:force_test, "");

      if (subfield(var.forced_test_params, "type") == "server") {
      set req.http.x-server-ab-tests = req.http.x-server-ab-tests + if(req.http.x-server-ab-tests == "", "", ",") + req.http.Cookie:force_test;
      } else {
      set req.http.x-client-ab-tests = req.http.x-client-ab-tests + if(req.http.x-client-ab-tests == "", "", ",") + req.http.Cookie:force_test;
      }
    }
  }
}

vcl_deliver {
  if(req.http.x-client-ab-tests != "") {
    add resp.http.Set-Cookie = "Client_AB_Tests=" + req.http.x-client-ab-tests + "; path=/; max-age=2592000";
    unset req.http.x-client-ab-tests;
  }

  if(req.http.x-server-ab-tests != "") {
    add resp.http.Set-Cookie = "Server_AB_Tests=" + req.http.x-server-ab-tests + "; path=/; max-age=2592000";
    unset req.http.x-server-ab-tests;
  }

  add resp.http.Set-Cookie = "MVT_id=" + req.http.X-mvt-id + "; path=/; max-age=2592000";
}
