import { h } from 'hyperapp';

import languages from 'n/@huchenme/github-trending/src/languages';

import ArticleTitle, {
  State as ArticleTitleState
} from '~/components/molecules/articleTitle';
import LanguageColor, {
  StateWithoutSize as LanguageColorState
} from '~/components/atoms/languageColor';
import Descripton, {
  State as DescriptonState
} from '~/components/atoms/descripton';
import Status, { State as StatusState } from '~/components/atoms/status';

export type State = ArticleTitleState &
  LanguageColorState &
  DescriptonState &
  StatusState;

export default ({
  author,
  name,
  authorUrl,
  nameUrl,
  description,
  stars,
  cps,
  forks,
  language,
  color
}: State) => (
  <div>
    <ArticleTitle {...{ author, name, authorUrl, nameUrl }} />
    <a
      onclick={() => {
        const langData = languages.filter(({ name }) => name === language)[0];
        if (langData === undefined) return;
        const { urlParam } = langData;
        location.search = `?l=${urlParam}`;
      }}
    >
      <LanguageColor {...{ language, color, size: 10 }} />
    </a>
    <Descripton {...{ description }} />
    <Status {...{ stars, cps, forks }} />
  </div>
);
