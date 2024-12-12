export default function showToast(title: string, description:string) {
  const toast = useToast()

  toast.add({
    title,
    description
  })
}
