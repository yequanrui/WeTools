const packageName = 'WeLink-Themes-Blue';
const packageName1 = 'WeLink-Themes-3.x';
const packageName2 = 'WeLink-Themes-7.x';
export default {
  paths() {
    return [
      { params: { pkg: packageName, version: '1.0.0' } },
      { params: { pkg: packageName1, version: '1.0.0' } },
      { params: { pkg: packageName2, version: '1.0.0' } },
      { params: { pkg: packageName, version: '2.0.0' } },
      { params: { pkg: packageName1, version: '2.0.0' } },
      { params: { pkg: packageName2, version: '2.0.0' } },
      { params: { pkg: packageName, version: '3.0.0' } },
      { params: { pkg: packageName1, version: '3.0.0' } },
      { params: { pkg: packageName2, version: '3.0.0' } },
    ];
  },
};
