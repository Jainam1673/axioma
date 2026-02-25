import { fetchDashboardData } from '@/app/actions/dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components/ui/table'
import { ArrowUpRight, ArrowDownRight, IndianRupee, Wallet, Users, Landmark } from 'lucide-react'

export default async function DashboardPage() {
    const {
        monthlySummary,
        withdrawalSummary,
        clientBalances,
        aggregatedTotals
    } = await fetchDashboardData()

    const currentMonthData = monthlySummary[0] || { gross_profit: 0, net_profit: 0, total_income: 0, total_expenses: 0 }
    const currProfit = Number(currentMonthData.net_profit) || 0
    const currIncome = Number(currentMonthData.total_income) || 0
    const currExpense = Number(currentMonthData.total_expenses) || 0

    return (
        <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
                <p className="text-muted-foreground">Monitor your business performance, cash flow, and outstanding balances.</p>
            </div>

            {/* Top Level Metrics (Current Month) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit (Current Month)</CardTitle>
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{currProfit.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            After expenses and salaries
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{currIncome.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Total incoming payments
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">₹{currExpense.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Total outward cash flow
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">₹{aggregatedTotals.totalOutstanding.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Unpaid client balances
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Cash Reserves */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Cash Reserves (Lifetime)</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bank Transfer</CardTitle>
                            <Landmark className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold">₹{aggregatedTotals.balances.bank.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 dark:bg-blue-950 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">UPI Payments</CardTitle>
                            <Wallet className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold text-blue-700 dark:text-blue-300">₹{aggregatedTotals.balances.upi.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-emerald-50 dark:bg-emerald-950 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Cash in Hand</CardTitle>
                            <IndianRupee className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">₹{aggregatedTotals.balances.cash.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Tables Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Historical Monthly Performance</CardTitle>
                        <CardDescription>Income vs Expenses over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Month</TableHead>
                                    <TableHead className="text-right">Income</TableHead>
                                    <TableHead className="text-right">Expenses</TableHead>
                                    <TableHead className="text-right">Net Profit</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {monthlySummary && monthlySummary.length > 0 ? (
                                    monthlySummary.map((row: any, i: number) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{row.month}</TableCell>
                                            <TableCell className="text-right text-green-600">₹{Number(row.total_income || 0).toLocaleString()}</TableCell>
                                            <TableCell className="text-right text-red-600">₹{Number(row.total_expenses || 0).toLocaleString()}</TableCell>
                                            <TableCell className="text-right font-bold">₹{Number(row.net_profit || 0).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No monthly data available.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Partner Draws Summary</CardTitle>
                        <CardDescription>Monthly withdrawals aggregated by partner.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Month</TableHead>
                                    <TableHead>Partner</TableHead>
                                    <TableHead className="text-right">Total Drawn</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {withdrawalSummary && withdrawalSummary.length > 0 ? (
                                    withdrawalSummary.map((row: any, i: number) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{row.month}</TableCell>
                                            <TableCell>{row.partner_name || 'Unknown'}</TableCell>
                                            <TableCell className="text-right font-bold">₹{Number(row.total_drawn || 0).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                            No partner withdrawals logged.
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
