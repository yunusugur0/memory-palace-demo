type Props = { onClick: () => void }

export default function Brand({ onClick }: Props) {
  return (
    <button className="brand" onClick={onClick}>
      Hafıza Sarayı
    </button>
  )
}
