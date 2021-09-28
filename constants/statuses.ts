export const statuses: { [key: string]: { text: string; value: number } } = {
  NOT_UPLOADED: { text: 'Not upload to ipfs', value: 1 },
  UPLOADED_TO_IPFS: { text: 'Uploaded to ipfs', value: 2 },
  PENDING_SELL: { text: 'Pending sell', value: 3 },
  GIVE_AWAY: { text: 'Give away', value: 4 },
  SOLD: { text: 'Sold', value: 5 }
}
