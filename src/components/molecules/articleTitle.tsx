import { h } from 'hyperapp';

export interface State {
  author: string;
  name: string;
  authorUrl: string;
  nameUrl: string;
}

export default ({ author, name, authorUrl, nameUrl }: State) => (
  <h3>
    📚 <a href={authorUrl}>{author}</a> / <a href={nameUrl}>{name}</a>
  </h3>
);
