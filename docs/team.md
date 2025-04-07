---
layout: page
title: 团队成员
titleTemplate: WeTools
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamPageSection, VPTeamMembers } from 'vitepress/theme'

const coreMembers = [{
  avatar: 'https://avatars.githubusercontent.com/u/26866409?v=4',
  name: '叶权瑞',
  title: '创建者',
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
    <template #lead>主要收录一些用于WeLink的工具集合</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>成员</template>
    <template #members>
      <VPTeamMembers size="small" :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
