import URLBuilder from 'components/urlbuilder';

export default {
    auth: {
        login: '/j_spring_security_check',
        loadUser: '/User/loggedInUser'
    },
    assets: {
        get(id) {
            return `/private/myAsset?id=${id}`;
        },
        getRest(id) {
            return `/rest/Asset/get?id=${id}`;
        },
        getList(index, count, sortBy, sortDir) {
            return new URLBuilder('/private/myAssets',
                {name: 'index', value: index},
                {name: 'count', value: count},
                {name: 'sortBy', value: sortBy},
                {name: 'sortDir', value: sortDir}).getUrl();
        },
        taxonomy(id) {
            return `/private/myAssetTaxonomy?id=${id}`;
        },
        similar(id) {
            return `/private/getSimilarAssets?aid=${id}`;
        }
    },
    news: {
        get(query) {
            return `/private/searchAzure?query=${query}`;
        }
    },
    interests: {
        get(id) {
            return `/private/myDesire?id=${id}`;
        },
        rss(id) {
            return `/private/rssInterest?id=${id}`;
        },
        getList(index, count, sortBy, sortDir) {
            return new URLBuilder('/private/myDesires',
                {name: 'index', value: index},
                {name: 'count', value: count},
                {name: 'sortBy', value: sortBy},
                {name: 'sortDir', value: sortDir}).getUrl();
        },
        taxonomy(id) {
            return `/private/myDesireTaxonomy?id=${id}`;
        }
    },
    company: {
        getRest(id) {
            return `/rest/Company/get?id=${id}`;
        },
        typeAhead: '/rest/Company/typeAhead',
        save: '/rest/Company/saveInProject'
    },
    projects: {
        getList(index, count, focus, sortBy, isSortAsc) {
            return new URLBuilder('/rest/Project/fullList',
                {name: 'index', value: index},
                {name: 'count', value: count},
                {name: 'focus', value: focus},
                {name: 'sortBy', value: sortBy},
                {name: 'isSortAsc', value: isSortAsc}).getUrl();
        },
        count: '/rest/Project/countFullList',
        get(id) {
            return `/rest/Project/get?id=${id}`;
        },
        save: '/rest/Project/saveInProject',
        setFocus(projectId, focus) {
            return `/rest/Project/setFocus?projectId=${projectId}&focus=${focus}`;
        }
    },
    projectContacts: {
        delete(id) {
            return `/rest/ProjectContact/delete?id=${id}`;
        }
    },
    person: {
        byCompany(index, count, company) {
            return new URLBuilder('/rest/Person/listByCompany',
                {name: 'index', value: index},
                {name: 'count', value: count},
                {name: 'company', value: company}).getUrl();
        },
        save: '/rest/Person/saveInProject'
    },
    find: {
        numberpatents(number) {
            return `/find/numberPatent?number=${number}`;
        },
        uploadFile: '/find/uploadFile'
    },
    labels: '/labels',
    ifiPatent: {
        save: '/rest/IfiPatent/saveInProject'
    },
    chart: {
        portfolioAssets(id) {
            return `/dashboard/project/patent?id=${id}`;
        },
        projectAverage(id) {
            return `/dashboard/project/average?id=${id}`;
        },
        projectBundles(id) {
            return `/dashboard/project/monetization?id=${id}`;
        },
        projectAgeProfile(id) {
            return `/dashboard/asset/age?id=${id}`;
        },
        projectClassification(id) {
            return `/dashboard/asset/classification?id=${id}`;
        },
        projectAssetScore(id) {
            return `/dashboard/asset/project?id=${id}`;
        }
    }
};
