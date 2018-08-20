// @flow
type Props = {
    data: {
        CAPI: CAPIType,
        NAV: NavType,
    },
    Page: React.ComponentType<{}>,
};

export default ({ data, Page }: Props) => <Page data={data} />;
