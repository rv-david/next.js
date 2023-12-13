'use server'
const data = []

export async function addData(newData: string) {
  // sleep 1s
  await new Promise((resolve) => setTimeout(resolve, 1000))
  data.push(newData)
}

export async function getData() {
  // sleep 1s
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return data
}
