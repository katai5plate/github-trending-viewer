import { h, app, ActionsType } from 'hyperapp';
import { parse, stringify } from 'query-string';

import { Since, JSONList } from '~/types';

import ArticleList from '~/components/organisms/articleList';

// import mock from '~/mock.json';

interface State {
  isInitialized: boolean;
  list: JSONList[] | [];
  language: string;
  since: Since;
}
const globalState: State = {
  isInitialized: false,
  list: [],
  language: '',
  since: 'daily'
};

const isBlank = (x: any) =>
  [null, undefined, NaN, '', 'undefined', 'null', 'NaN'].includes(x);
const getUrlParams = () => {
  const { l = '', s } = parse(location.search);
  const c = (x: any) => (isBlank(x) ? undefined : x);
  return {
    language: c(l),
    since: c(s)
  };
};
const setUrlParams = ({ language = undefined, since = 'daily' }) => {
  location.search = `?${stringify({ s: since, l: language })}`;
};

interface Actions {
  redirect(value: { language?: string; since: string }): State;
  initFetch(search: string): State;
  initFetchDone: (res: {}) => State;
  initFetchError: (error: {}) => State;
}
const globalActions: ActionsType<State, Actions> = {
  redirect: ({ language, since }) => () => {
    setUrlParams({ language, since });
  },
  initFetch: search => async (state, actions) => {
    const { language, since } = getUrlParams();
    const enc = (s: any) => encodeURIComponent(String(s));
    const api = 'https://github-trending-api.now.sh/repositories';
    // const api = 'http://localhost:1234/mock.json';
    try {
      const url = `${api}?${stringify({
        language: isBlank(language) ? undefined : enc(language),
        since: isBlank(since) ? undefined : enc(since)
      })}`;
      console.log(url);
      actions.initFetchDone(await (await fetch(url)).json());
    } catch (error) {
      actions.initFetchError(error);
    }
  },
  initFetchDone: res => {
    const { language, since } = getUrlParams();
    return { isInitialized: true, list: res, language, since };
  },
  initFetchError: error => {
    console.error(error);
    alert(error);
    return { isInitialized: true };
  }
};

app(
  globalState,
  globalActions,
  (state, actions) => {
    if (location.search === '') {
      actions.redirect({ since: 'daily' });
      return <div />;
    } else {
      const { language, since } = getUrlParams();
      console.log(getUrlParams());
      if (isBlank(since)) {
        actions.redirect({ language });
        return <div />;
      }
    }
    if (false === state.isInitialized) {
      actions.initFetch(location.search);
    }
    return (
      <div>
        <h1>GitHub Trending</h1>
        <h2>{isBlank(state.language) ? '' : `${state.language} `}List</h2>
        {state.list.length > 0 && <ArticleList list={state.list} />}
      </div>
    );
  },
  document.body
);
