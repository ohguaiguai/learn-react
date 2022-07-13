import { ReactElement } from "../types";

export default class Component<P = any> {
  isReactComponent = true;
  static isReactComponent = true;
  public props: P;
  constructor(props: P) {
    this.props = props;
  }
  render(): ReactElement | null {
    return null;
  }
}
