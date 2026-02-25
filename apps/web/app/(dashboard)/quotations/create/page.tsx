'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addQuotation } from '@/app/actions/quotations'
import { fetchClients } from '@/app/actions/clients'
import { Button } from '@repo/ui/components/ui/button'
import { Input } from '@repo/ui/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card'

export default function CreateQuotationPage() {
    const router = useRouter()
    const [clients, setClients] = useState<any[]>([])
    const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0 }])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchClients().then(data => {
            if (data) setClients(data)
        })
    }, [])

    const addItem = () => {
        setItems([...items, { description: '', quantity: 1, unitPrice: 0 }])
    }

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index))
    }

    const updateItem = (index: number, field: string, value: string | number) => {
        const newItems = [...items]
        newItems[index] = { ...newItems[index], [field]: value }
        setItems(newItems)
    }

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        // Filter out empty items
        const validItems = items.filter(i => i.description.trim() !== '' && i.quantity > 0 && i.unitPrice > 0)

        if (validItems.length === 0) {
            setError('Please add at least one valid line item.')
            setLoading(false)
            return
        }

        const result = await addQuotation(formData, validItems)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push('/quotations')
        }
    }

    return (
        <div className="flex flex-col gap-6 p-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Quotation</h1>
                <p className="text-muted-foreground">Fill in the details to generate a new quote.</p>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Client Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="client_id" className="text-sm font-medium">Select Client *</label>
                            <select
                                name="client_id"
                                id="client_id"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                                <option value="">-- Choose a client --</option>
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>{c.client_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="terms" className="text-sm font-medium">Terms & Conditions</label>
                            <textarea
                                name="terms"
                                id="terms"
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                placeholder="Payment due in 15 days..."
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Line Items</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={addItem}>
                            + Add Item
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-24">
                                    <Input
                                        type="number"
                                        min="1"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                </div>
                                <div className="w-32">
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="Price"
                                        value={item.unitPrice}
                                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                        required
                                    />
                                </div>
                                <div className="w-32 pt-2 text-right font-medium">
                                    ₹{(item.quantity * item.unitPrice).toFixed(2)}
                                </div>
                                {items.length > 1 && (
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeItem(index)}>
                                        X
                                    </Button>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-end space-x-8">
                            <div className="space-y-4 w-64">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm gap-4">
                                    <span className="text-muted-foreground">Discount</span>
                                    <Input name="discount" type="number" defaultValue="0" min="0" step="0.01" className="h-8 w-24 text-right" />
                                </div>
                                <div className="flex justify-between items-center text-sm gap-4">
                                    <span className="text-muted-foreground">Tax</span>
                                    <Input name="tax" type="number" defaultValue="0" min="0" step="0.01" className="h-8 w-24 text-right" />
                                </div>
                                <div className="pt-4 border-t flex justify-between items-center">
                                    <span className="font-semibold">Grand Total</span>
                                    <span className="text-lg font-bold">Auto-calcualted</span>
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500 mt-4 text-right">{error}</p>}

                        <div className="mt-8 flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => router.push('/quotations')}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Quotation'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
