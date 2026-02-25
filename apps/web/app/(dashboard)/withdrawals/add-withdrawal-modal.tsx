'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addWithdrawal, fetchPartners } from '@/app/actions/withdrawals'
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

export function AddWithdrawalModal() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [partners, setPartners] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        fetchPartners().then(data => { if (data) setPartners(data) })
    }, [])

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await addWithdrawal(formData)
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
                <Button>Record Withdrawal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Log Partner Withdrawal</DialogTitle>
                        <DialogDescription>
                            Record a withdrawal taken by a company partner.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="withdrawal_date" className="text-right text-sm font-medium">
                                Date
                            </label>
                            <Input id="withdrawal_date" name="withdrawal_date" type="date" className="col-span-3" required defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="partner_id" className="text-right text-sm font-medium">
                                Partner
                            </label>
                            <select id="partner_id" name="partner_id" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                                <option value="">Select partner...</option>
                                {partners.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="amount" className="text-right text-sm font-medium">
                                Amount (₹)
                            </label>
                            <Input id="amount" name="amount" type="number" step="0.01" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="reason_notes" className="text-right text-sm font-medium">
                                Notes
                            </label>
                            <Input id="reason_notes" name="reason_notes" placeholder="e.g. Monthly Draw" className="col-span-3" />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Withdrawal'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
