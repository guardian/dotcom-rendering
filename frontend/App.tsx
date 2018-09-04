import React from 'react';

export interface Data {
    CAPI: CAPIType,
    NAV: NavType,
    page: string,
    site: string
};

const App: React.SFC<{
    data: Data,
    Page: React.StatelessComponent<{data: Data}>,
}> = ({ Page, data }) => <Page data={data}/>

export default App;
