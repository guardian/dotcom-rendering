import React from 'react';
export interface Data  {
    CAPI: CAPIType,
    NAV: NavType,
    page: string,
    site: string
}
type Props = {
    data: Data,
    Page: React.ComponentType<{data:Data}>
};
const page: React.SFC<Props>= ({Page,data}) => <Page data={data}/>
export default page
