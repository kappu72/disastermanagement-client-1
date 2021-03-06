const {createSelector} = require('reselect');
const {last, head} = require('lodash');

const navItemsSel = ({disaster = {}}) => disaster.navItems || [];
const riskItemsSel = ({disaster = {}}) => disaster.overview || [];
const hazardTypeSel = ({disaster = {}}) => disaster.hazardType || {};
const analysisTypeSel = ({disaster = {}}) => disaster.analysisType || {};
const riskAnalysisDataSel = ({disaster = {}}) => disaster.riskAnalysisData || {};
const dimSelector = ({disaster = {}}) => disaster.dim || 0;
const topBarSelector = createSelector([navItemsSel, riskItemsSel, hazardTypeSel],
     (navItems, riskItems, hazardType) => ({
        navItems,
        title: (last(navItems) || {label: ''}).label,
        overviewHref: (last(navItems) || {href: ''}).href,
        riskItems,
        activeRisk: hazardType.mnemonic || "Overview"
    }));
const dataContainerSelector = createSelector([riskItemsSel, hazardTypeSel, analysisTypeSel, riskAnalysisDataSel, dimSelector],
    ( riskItems, hazardType, analysisType, riskAnalysisData, dim) => ({
        showHazard: hazardType.mnemonic ? true : false,
        hazardTitle: hazardType.mnemonic ? head(riskItems.filter((hz) => hz.mnemonic === hazardType.mnemonic)).title || '' : '',
        hazardType,
        analysisType,
        riskAnalysisData,
        dim
    }));
module.exports = {
    topBarSelector,
    dataContainerSelector
};

