import { fetchWithdrawals } from '@/app/actions/withdrawals'
import { AddWithdrawalModal } from './add-withdrawal-modal'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card'

export default async function WithdrawalsPage() {
    const withdrawals = await fetchWithdrawals()

    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Partner Withdrawals</h1>
                    <p className="text-muted-foreground">Track draws taken by active company partners.</p>
                </div>
                <AddWithdrawalModal />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Withdrawal History</CardTitle>
                    <CardDescription>A ledger of all partner withdrawals over time.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Partner Name</TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead className="text-right">Amount Drawn</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {withdrawals && withdrawals.length > 0 ? (
                                withdrawals.map((w: any) => (
                                    <TableRow key={w.id}>
                                        <TableCell>{w.withdrawal_date}</TableCell>
                                        <TableCell className="font-medium">{w.profiles?.full_name || 'Unknown'}</TableCell>
                                        <TableCell>{w.reason_notes || '-'}</TableCell>
                                        <TableCell className="text-right font-semibold">
                                            ₹{w.amount}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No withdrawals logged.
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
