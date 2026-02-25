'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addIncome } from '@/app/actions/transactions'
import { fetchClients } from '@/app/actions/clients'
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

export function AddIncomeModal() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        fetchClients().then(data => { if (data) setClients(data) })
    }, [])

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await addIncome(formData)
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
                <Button variant="outline" className="border-green-200 text-green-700 bg-green-50 hover:bg-green-100">+ Add Income</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Log Income</DialogTitle>
                        <DialogDescription>
                            Record an incoming payment from a project.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="income_date" className="text-right text-sm font-medium">
                                Date
                            </label>
                            <Input id="income_date" name="income_date" type="date" className="col-span-3" required defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="client_id" className="text-right text-sm font-medium">
                                Client
                            </label>
                            <select id="client_id" name="client_id" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                                <option value="">Select client...</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.client_name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="project_name" className="text-right text-sm font-medium">
                                Project
                            </label>
                            <Input id="project_name" name="project_name" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="total_deal_value" className="text-right text-sm font-medium">
                                Deal Value (₹)
                            </label>
                            <Input id="total_deal_value" name="total_deal_value" type="number" step="0.01" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="amount_received" className="text-right text-sm font-medium">
                                Received (₹)
                            </label>
                            <Input id="amount_received" name="amount_received" type="number" step="0.01" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="payment_platform" className="text-right text-sm font-medium">
                                Method
                            </label>
                            <select id="payment_platform" name="payment_platform" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="UPI">UPI</option>
                                <option value="Cash">Cash</option>
                            </select>
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Income'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
