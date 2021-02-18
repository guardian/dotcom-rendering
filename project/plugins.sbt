addSbtPlugin("com.twitter" % "scrooge-sbt-plugin" % "20.4.1")
resolvers += "Guardian Platform Bintray" at "https://dl.bintray.com/guardian/platforms"
addSbtPlugin("com.gu" % "sbt-scrooge-typescript" % "1.2.5")

addSbtPlugin("org.foundweekends" % "sbt-bintray" % "0.5.6")

addSbtPlugin("com.github.gseitz" % "sbt-release" % "1.0.13")

addSbtPlugin("com.jsuereth" % "sbt-pgp" % "2.0.0")

addSbtPlugin("org.xerial.sbt" % "sbt-sonatype" % "3.9.4")