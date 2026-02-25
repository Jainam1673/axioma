import { fetchTransactions } from '@/app/actions/transactions'
import { AddExpenseModal } from './add-expense-modal'
import { AddIncomeModal } from './add-income-modal'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card'

export default async function TransactionsPage() {
    const { expenses, income } = await fetchTransactions()

    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                    <p className="text-muted-foreground">Log standalone expenses and incoming project revenues.</p>
                </div>
                <div className="flex gap-4">
                    <AddExpenseModal />
                    <AddIncomeModal />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Income</CardTitle>
                        <CardDescription>Direct incoming payments logged.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Client/Project</TableHead>
                                    <TableHead>Received</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {income && income.length > 0 ? (
                                    income.map((inc: any) => (
                                        <TableRow key={inc.id}>
                                            <TableCell>{inc.income_date}</TableCell>
                                            <TableCell>
                                                <div className="font-medium">{inc.clients?.client_name || '-'}</div>
                                                <div className="text-xs text-muted-foreground">{inc.project_name}</div>
                                            </TableCell>
                                            <TableCell className="font-semibold text-green-600">₹{inc.amount_received}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${inc.payment_status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                        inc.payment_status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {inc.payment_status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No income logged.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Expenses</CardTitle>
                        <CardDescription>Company expenditures logged.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expenses && expenses.length > 0 ? (
                                    expenses.map((exp: any) => (
                                        <TableRow key={exp.id}>
                                            <TableCell>{exp.expense_date}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">
                                                    {exp.category}
                                                </span>
                                            </TableCell>
                                            <TableCell>{exp.vendor_name || '-'}</TableCell>
                                            <TableCell className="text-right font-semibold text-red-600">
                                                ₹{exp.amount}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No expenses logged.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
