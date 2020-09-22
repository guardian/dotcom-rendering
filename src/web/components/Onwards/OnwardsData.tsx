import { useApi } from '@root/src/web/lib/api';

type Props = {
    url: string;
    limit: number; // Limit the number of items shown (the api often returns more)
    ophanComponentName: OphanComponentName;
    container: React.FC<OnwardsType>;
};

type OnwardsResponse = {
    trails: [];
    heading: string;
    displayname: string;
};

export const OnwardsData = ({
    url,
    limit,
    ophanComponentName,
    container,
}: Props) => {
    const { data } = useApi<OnwardsResponse>(url);
    if (data && data.trails) {
        return container({
            heading: data.heading || data.displayname, // Sometimes the api returns heading as 'displayName'
            trails: limit ? data.trails.slice(0, limit) : data.trails,
            ophanComponentName,
        });
    }

    return null;
};
