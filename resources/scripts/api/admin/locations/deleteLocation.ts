import axios from '@/lib/axios.ts'

const deleteLocation = async (location: number) => {
    await axios.delete(`/api/admin/locations/${location}`)
}

export default deleteLocation
