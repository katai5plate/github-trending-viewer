import { h } from 'hyperapp';

export interface State {
  color: string;
  language: string;
  size: number;
}
export interface StateWithoutSize {
  color: string;
  language: string;
}

export default ({ color, language, size }: State) => (
  <div>
    <span
      class="language-color"
      style={`background-color: ${color}; width: ${size}; height: ${size};`}
    />{' '}
    {language}
  </div>
);
