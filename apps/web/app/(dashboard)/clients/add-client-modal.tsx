'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addClient } from '@/app/actions/clients'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@repo/ui/components/ui/dialog'
import { Button } from '@repo/ui/components/ui/button'
import { Input } from '@repo/ui/components/ui/input'

export function AddClientModal() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await addClient(formData)
        setLoading(false)

        if (result.error) {
            setError(result.error)
        } else {
            setOpen(false)
            router.refresh()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add New Client</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Client</DialogTitle>
                        <DialogDescription>
                            Create a new client record for your company.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="client_name" className="text-right text-sm font-medium">
                                Name *
                            </label>
                            <Input id="client_name" name="client_name" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="client_type" className="text-right text-sm font-medium">
                                Type
                            </label>
                            <Input id="client_type" name="client_type" placeholder="e.g. Marketing" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="contact_details" className="text-right text-sm font-medium">
                                Contact
                            </label>
                            <Input id="contact_details" name="contact_details" placeholder="Email or Phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="gst_number" className="text-right text-sm font-medium">
                                GST No.
                            </label>
                            <Input id="gst_number" name="gst_number" className="col-span-3" />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Save Client'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
