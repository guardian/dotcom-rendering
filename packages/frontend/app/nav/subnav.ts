import { makeNavLink } from './navigation';

const flatOrParentSubnav = (
    parent: LinkType | undefined,
    links: LinkType[],
): FlatSubnav | ParentSubnav | undefined => {
    if (parent !== undefined) {
        return { parent, links };
    }

    if (links.length > 0) {
        return { links };
    }

    return undefined;
};

const customSignPostingSubNav = (
    customSignPosting: NavItem,
): FlatSubnav | ParentSubnav => {
    const links: LinkType[] = customSignPosting.links.map(link =>
        makeNavLink(link.breadcrumbTitle, link.href),
    );
    const parent: LinkType = makeNavLink(
        customSignPosting.name.breadcrumbTitle,
        customSignPosting.name.href,
    );
    return { parent, links };
};

const nonCustomSignPostingSubNav = (
    customSignPosting?: NavItem,
    currentNavLink?: LinkType,
    currentParent?: LinkType,
    currentPillar?: LinkType,
): FlatSubnav | ParentSubnav | undefined => {
    const currentNavIsPillar: boolean = currentNavLink === currentPillar;
    const currentNavHasChildren: boolean = currentNavLink
        ? currentNavLink.children.length > 0
        : false;
    const parentIsPillar: boolean = currentParent === currentPillar;

    const subnavParent = () => {
        if (currentNavHasChildren && !currentNavIsPillar) {
            return currentNavLink;
        }
        if (parentIsPillar) {
            return undefined;
        }

        return currentParent;
    };

    const subnavLink = () => {
        if (currentNavHasChildren) {
            return currentNavLink ? currentNavLink.children : [];
        }
        return currentParent ? currentParent.children : [];
    };

    const parent = subnavParent();
    const links = subnavLink();

    return flatOrParentSubnav(parent, links);
};

const getSubnav = (
    customSignPosting?: NavItem,
    currentNavLink?: LinkType,
    currentParent?: LinkType,
    currentPillar?: LinkType,
): FlatSubnav | ParentSubnav | undefined => {
    if (customSignPosting) {
        return customSignPostingSubNav(customSignPosting);
    }

    return nonCustomSignPostingSubNav(
        customSignPosting,
        currentNavLink,
        currentParent,
        currentPillar,
    );
};

export { getSubnav };
