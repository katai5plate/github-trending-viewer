import { h } from 'hyperapp';

import LanguageColor, {
  StateWithoutSize
} from '~/components/atoms/languageColor';

export default (state: StateWithoutSize) => (
  <h2>
    <LanguageColor {...state} size={24} />
  </h2>
);
