export default function Icon({name, solid}) {
  return (
    <ion-icon name={solid ? name : `${name}-outline`}></ion-icon>
  )
}
