import React from 'react';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';

import { CodeBlockComponent } from './CodeBlockComponent';

export default {
	component: CodeBlockComponent,
	title: 'Components/CodeBlockComponent',
};

export const JavascriptStory = () => {
	const javascript = `
import React from 'react';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';

import { CodeBlockComponent } from './CodeBlockComponent';

export default {
    component: CodeBlockComponent,
    title: 'Components/CodeBlockComponent',
};

export const JavascriptStory = () => {
    return (
        <ContainerLayout>
            <CodeBlockComponent code="// this story" language="javascript" />
        </ContainerLayout>
    );
};
JavascriptStory.story = {
    name: 'with javascript',
};
    `;
	return (
		<ContainerLayout>
			<CodeBlockComponent code={javascript} language="javascript" />
		</ContainerLayout>
	);
};
JavascriptStory.story = {
	name: 'with javascript',
};

export const ScalaStory = () => {
	const scala = `
import akka.http.scaladsl.model.HttpRequest
import ch.qos.logback.classic.{Logger => LogbackLogger}
import net.logstash.logback.marker.Markers
import org.slf4j.{LoggerFactory, Logger => SLFLogger}

import scala.collection.JavaConverters._

object Logging {
    val rootLogger: LogbackLogger = LoggerFactory.getLogger(SLFLogger.ROOT_LOGGER_NAME).asInstanceOf[LogbackLogger]

    private def setMarkers(request: HttpRequest) = {
    val markers = Map(
        "path" -> request.uri.path.toString(),
        "method" -> request.method.value
    )
    Markers.appendEntries(markers.asJava)
    }

    def infoWithMarkers(message: String, akkaRequest: HttpRequest) =
    rootLogger.info(setMarkers(akkaRequest), message)
}
    `;
	return (
		<ContainerLayout>
			<CodeBlockComponent code={scala} language="scala" />
		</ContainerLayout>
	);
};
ScalaStory.story = {
	name: 'with scala',
};

export const TypescriptStory = () => {
	const typescript = `
// CodeBlockElement props
type Props = {
    code: string;
    language?: Language;
};

// Used for CodeBlockElement
type Language =
    | 'typescript'
    | 'javascript'
    | 'css'
    | 'markup'
    | 'scala'
    | 'elm';
`;
	return (
		<ContainerLayout>
			<CodeBlockComponent code={typescript} language="typescript" />
		</ContainerLayout>
	);
};
TypescriptStory.story = {
	name: 'with typescript',
};
