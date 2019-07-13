import { h } from 'hyperapp';

export interface State {
  description: string;
}

export default ({ description }: State) => <p>{description}</p>;
