'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { recordPayment } from '@/app/actions/invoices'
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

export function PaymentModal({ invoiceId, balance }: { invoiceId: string, balance: number }) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        formData.append('invoice_id', invoiceId)
        const result = await recordPayment(formData)
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
            <DialogTrigger>
                <Button size="sm" variant="outline">Record Payment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Record Payment</DialogTitle>
                        <DialogDescription>
                            Log a payment received for this invoice.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="amount" className="text-right text-sm font-medium">
                                Amount (₹)
                            </label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                max={balance}
                                defaultValue={balance}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="platform" className="text-right text-sm font-medium">
                                Method
                            </label>
                            <select
                                id="platform"
                                name="platform"
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                required
                            >
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="UPI">UPI</option>
                                <option value="Cash">Cash</option>
                                <option value="Card">Card</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="reference" className="text-right text-sm font-medium">
                                Ref No.
                            </label>
                            <Input id="reference" name="reference" placeholder="Txn ID" className="col-span-3" />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Confirm Payment'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
