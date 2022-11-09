import IMatch from './IMatch';

export default interface IMessage {
  status: number,
  message?: string,
  token?: string,
  match?: IMatch,
}
