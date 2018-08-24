import React from 'react'
type Data = {
    CAPI: CAPIType,
    NAV: NavType,
}
type Props = {
    data: Data,
    Page: React.ComponentType<{data:Data}>
};
const page: React.SFC<Props>= ({Page,data}) => <Page data={data}/>
export default page
