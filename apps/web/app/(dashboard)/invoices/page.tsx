import { fetchInvoices } from '@/app/actions/invoices'
import Link from 'next/link'
import { PaymentModal } from './payment-modal'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card'
import { Button } from '@repo/ui/components/ui/button'

export default async function InvoicesPage() {
    const invoices = await fetchInvoices()

    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                    <p className="text-muted-foreground">Track billing, outstanding balances, and record payments.</p>
                </div>
                <Link href="/invoices/create">
                    <Button>Create Invoice</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Invoice Ledger</CardTitle>
                    <CardDescription>A list of all generated invoices and their payment status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice No.</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Grand Total</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices && invoices.length > 0 ? (
                                invoices.map((inv: any) => (
                                    <TableRow key={inv.id}>
                                        <TableCell className="font-medium">{inv.invoice_number}</TableCell>
                                        <TableCell>{inv.clients?.client_name || '-'}</TableCell>
                                        <TableCell>{inv.invoice_date}</TableCell>
                                        <TableCell>₹{inv.grand_total}</TableCell>
                                        <TableCell className="font-semibold text-red-600">
                                            ₹{inv.outstanding_balance}
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${inv.payment_status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                    inv.payment_status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {inv.payment_status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {inv.outstanding_balance > 0 && (
                                                <PaymentModal invoiceId={inv.id} balance={inv.outstanding_balance} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                        No invoices found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
