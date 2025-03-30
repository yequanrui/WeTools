---
layout: page
title: Team
titleTemplate: WeTools
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamPageSection, VPTeamMembers } from 'vitepress/theme'

const coreMembers = [{
  avatar: 'https://avatars.githubusercontent.com/u/26866409?v=4',
  name: 'Quanrui Ye',
  title: 'Creator',
  links: [
    { icon: 'github', link: 'https://github.com/yequanrui' },
    { icon: 'npm', link: 'https://www.npmjs.com/~yequanrui' }
  ]
}];
const members = []
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>WeTools</template>
    <template #lead>An <a target="_blank" href="https://cn.electron-vite.org">Electron-Vite</a> application with <a target="_blank" href="https://opentiny.design/tiny-vue">TinyVue</a></template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Members</template>
    <template #members>
      <VPTeamMembers size="small" :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
