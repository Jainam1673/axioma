import { fetchQuotations } from '@/app/actions/quotations'
import Link from 'next/link'
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

export default async function QuotationsPage() {
    const quotations = await fetchQuotations()

    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
                    <p className="text-muted-foreground">Manage and track your client proposals.</p>
                </div>
                <Link href="/quotations/create">
                    <Button>Create Quotation</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Quotations</CardTitle>
                    <CardDescription>A list of all generated quotes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Quote No.</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead>Grand Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quotations && quotations.length > 0 ? (
                                quotations.map((quote: any) => (
                                    <TableRow key={quote.id}>
                                        <TableCell className="font-medium">{quote.quotation_number}</TableCell>
                                        <TableCell>{quote.clients?.client_name || '-'}</TableCell>
                                        <TableCell>{quote.quotation_date}</TableCell>
                                        <TableCell>₹{quote.subtotal}</TableCell>
                                        <TableCell className="font-semibold">₹{quote.grand_total}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                                                {quote.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No quotations found.
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
