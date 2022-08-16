import ReleaseTransformations._

val contentEntityVersion = "2.0.6"
val contentAtomVersion = "3.2.2"
val storyPackageVersion = "2.0.4"
val contentApiModelsVersion = "17.1.1"

val scroogeDependencies = Seq(
  "content-api-models",
  "story-packages-model-thrift",
  "content-atom-model-thrift",
  "content-entity-thrift"
)

val libraryDeps = Seq(
  "com.gu" % "content-api-models" % contentApiModelsVersion,
  "com.gu" % "story-packages-model-thrift" % storyPackageVersion,
  "com.gu" % "content-atom-model-thrift" % contentAtomVersion,
  "com.gu" % "content-entity-thrift" % contentEntityVersion
)

ThisBuild / organization := "com.gu"
ThisBuild / scalaVersion := "2.12.11"
ThisBuild / licenses += ("Apache-2.0", url("https://www.apache.org/licenses/LICENSE-2.0.html"))

lazy val scalaApiModels = project.in(file("api-models") / "scala")
  .settings(
    name := "apps-rendering-api-models",
    description := "Models used by the apps-rendering API",

	Compile / scroogeLanguages := Seq("scala"),
	Compile / scroogeThriftSourceFolder := baseDirectory.value / "../thrift/src/main/thrift",
	Compile / scroogeThriftDependencies ++= scroogeDependencies,

    libraryDependencies ++= Seq(
      "org.apache.thrift" % "libthrift" % "0.16.0",
      "com.twitter" %% "scrooge-core" % "20.4.1",
      "com.gu" %% "content-api-models-scala" % contentApiModelsVersion
    ) ++ libraryDeps,

    publishTo := sonatypePublishToBundle.value,

    scmInfo := Some(ScmInfo(
      url("https://github.com/guardian/apps-rendering"),
      "scm:git:git@github.com:guardian/apps-rendering.git"
    )),

    homepage := Some(url("https://github.com/guardian/apps-rendering")),

    developers := List(Developer(
      id = "Guardian",
      name = "Guardian",
      email = null,
      url = url("https://github.com/guardian")
    )),

    releasePublishArtifactsAction := PgpKeys.publishSigned.value,
    releaseProcess := Seq[ReleaseStep](
      checkSnapshotDependencies,
      inquireVersions,
      runClean,
      runTest,
      setReleaseVersion,
      commitReleaseVersion,
      tagRelease,
      publishArtifacts,
      releaseStepCommand("sonatypeBundleRelease"),
      setNextVersion,
      commitNextVersion,
      pushChanges
    )
  )

lazy val tsApiModels = project.in(file("api-models") / "ts")
  .enablePlugins(ScroogeTypescriptGen)
  .settings(
    name := "apps-rendering-api-models-ts",
    scroogeTypescriptNpmPackageName := "@guardian/apps-rendering-api-models",
    Compile / scroogeDefaultJavaNamespace := scroogeTypescriptNpmPackageName.value,
    description := "Models used by the apps-rendering API",

    scroogeTypescriptPackageLicense := "Apache-2.0",
	Compile / scroogeThriftSourceFolder := baseDirectory.value / "../thrift/src/main/thrift",
	Compile / scroogeLanguages := Seq("typescript"),
	Compile / scroogeThriftDependencies ++= scroogeDependencies,

    scroogeTypescriptPackageMapping := Map(
      "content-api-models" -> "@guardian/content-api-models",
      "content-entity-thrift" -> "@guardian/content-entity-model",
      "content-atom-model-thrift" -> "@guardian/content-atom-model",
      "story-packages-model-thrift" -> "@guardian/story-packages-model"
    ),

    libraryDependencies ++= libraryDeps,
  )
