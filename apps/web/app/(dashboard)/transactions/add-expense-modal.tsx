'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addExpense } from '@/app/actions/transactions'
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

export function AddExpenseModal() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await addExpense(formData)
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
                <Button variant="outline" className="border-red-200 text-red-700 bg-red-50 hover:bg-red-100">+ Add Expense</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Log Expense</DialogTitle>
                        <DialogDescription>
                            Record a new company expense.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="expense_date" className="text-right text-sm font-medium">
                                Date
                            </label>
                            <Input id="expense_date" name="expense_date" type="date" className="col-span-3" required defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="category" className="text-right text-sm font-medium">
                                Category
                            </label>
                            <select id="category" name="category" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                                <option value="Software">Software</option>
                                <option value="Rent">Rent</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Salary">Salary</option>
                                <option value="Equipment">Equipment</option>
                                <option value="Misc">Misc</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="vendor_name" className="text-right text-sm font-medium">
                                Vendor
                            </label>
                            <Input id="vendor_name" name="vendor_name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="amount" className="text-right text-sm font-medium">
                                Amount (₹)
                            </label>
                            <Input id="amount" name="amount" type="number" step="0.01" className="col-span-3" required />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Expense'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
