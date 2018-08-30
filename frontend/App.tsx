import React from 'react';

export interface Data {
    CAPI: CAPIType,
    NAV: NavType,
    page: string,
    site: string
};

type Props = {
    data: Data,
    Page: React.StatelessComponent<{data: Data}>,
    // Page: React.ComponentType<{data:Data}>
};

const App: React.SFC<Props>= ({ Page, data }: Props) => <Page data={data}/>

export default App;
