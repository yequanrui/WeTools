---
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamPageSection, VPTeamMembers } from 'vitepress/theme'

const coreMembers = [{
  avatar: 'https://www.github.com/yyx990803.png',
  name: 'Evan You',
  title: 'Creator',
  links: [
    { icon: 'github', link: 'https://github.com/yyx990803' },
    { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
  ]
}];
const partners = []
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Team Name</template>
    <template #lead>Team Desc</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
