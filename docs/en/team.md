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
    <template #lead>Some tools used in WeLink are included.</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Members</template>
    <template #members>
      <VPTeamMembers size="small" :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
