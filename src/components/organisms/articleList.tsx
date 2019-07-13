import { h } from 'hyperapp';

import Article from '~/components/molecules/article';
import { JSONList } from '~/types';

interface State {
  list: JSONList[];
}

export default ({ list }: State) => (
  <div>
    {list.length > 0 &&
      list.map((jsonArticle: JSONList) => {
        const {
          author,
          name,
          url,
          description,
          language,
          languageColor,
          stars,
          forks,
          currentPeriodStars,
          builtBy
        } = jsonArticle;
        return (
          <Article
            {...{
              author,
              name,
              authorUrl: (builtBy[0] && builtBy[0].href) || '',
              nameUrl: url,
              description,
              stars,
              cps: currentPeriodStars,
              forks,
              language,
              color: languageColor
            }}
          />
        );
      })}
  </div>
);
