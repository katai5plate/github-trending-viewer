import { h } from 'hyperapp';

export interface State {
  stars: number;
  cps: number;
  forks: number;
}

export default ({ stars, cps, forks }: State) => (
  <table>
    <tr>
      <th>⭐️</th>
      <th>✨</th>
      <th>🍴</th>
    </tr>
    <tr>
      <th>{stars}</th>
      <th>{cps}</th>
      <th>{forks}</th>
    </tr>
  </table>
);
