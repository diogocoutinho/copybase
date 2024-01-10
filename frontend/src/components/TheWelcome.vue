<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Decumentação</template>

    Toda a documentação deste projeto está disponível em
    <a href="https://github.com/diogocoutinho/copybase" target="_blank" rel="noopener">diogocoutinho/copybase</a>.
      Se você está procurando
    por um tutorial, você pode encontrar um no
    <a href="https://github.com/diogocoutinho/copybase/blob/master/README.md" target="_blank" rel="noopener">README.md</a>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Ferramentas</template>

    Este projeto foi criado com
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a> para o frontend,
      e NestJS para o backend. O código fonte está disponível em
    <a href="https://github.com/diogocoutinho/copybase/tree/master/backend" target="_blank" rel="noopener">diogocoutinho/copybase</a>.
      A IDE
      usado para desenvolver este projeto foi
    <a href="https://www.jetbrains.com/phpstorm/" target="_blank" rel="noopener">PHPStorm</a>. Se
    você está procurando uma ferramenta para testar o código, você pode usar
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> e
    <a href="https://on.cypress.io/component" target="_blank" rel="noopener"
      >Cypress Component Testing</a
    >.

    <br />

    Mais instruções em <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosistema</template>

    O ecossistema do Frontend é compostor por:
  <p>FrontEnd</p>
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, e
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>.
  <p>BackEnd</p>
    <a href="https://docs.nestjs.com/" target="_blank" rel="noopener">NestJS</a>,
    <a href="https://docs.nestjs.com/techniques/database" target="_blank" rel="noopener">NestJS Database</a>,
    <a href="https://docs.nestjs.com/techniques/mongodb" target="_blank" rel="noopener">NestJS MongoDB</a>,
    <a href="https://www.npmjs.com/package/class-transformer" target="_blank" rel="noopener">Class Transformer</a>,
    <a href="https://www.npmjs.com/package/class-validator" target="_blank" rel="noopener">Class Validator</a>
    <a href="https://www.npmjs.com/package/@nestjs/swagger" target="_blank" rel="noopener">NestJS Swagger</a>,
    <a href="https://www.npmjs.com/package/@nestjs/jwt" target="_blank" rel="noopener">NestJS JWT</a>,
    <a href="https://www.npmjs.com/package/@nestjs/passport" target="_blank" rel="noopener">NestJS Passport</a>,
  <p>Docker</p>
    <a href="https://www.docker.com/" target="_blank" rel="noopener">Docker</a>,
    <a href="https://hub.docker.com/_/mongo" target="_blank" rel="noopener">MongoDB</a>,
    <a href="https://hub.docker.com/_/mongo-express" target="_blank" rel="noopener">Mongo Express</a>,
    <a href="https://hub.docker.com/_/node" target="_blank" rel="noopener">Node</a>,


  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>
