import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Stack } from 'react-bootstrap'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpensesModal from './components/AddExpensesModal'
import UnCategorizedBudgetCard from './components/unCategorizedBudgetCard'
import BudgetCard from './components/BudgetCard'
import { BudgetsProvider, useBudgets } from './contexts/BudgetsContext'
import TotalBudgetCard from './components/TotalBudgetCard'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false)
  const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpensesModal(budgetId) {
    setShowAddExpensesModal(true)
    setAddExpensesModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction="horiZontal" gap="2" className="mb-4">
          <h1 className='me-auto'>Budgets</h1>
          <Button
            variant='primary'
            onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant='outline-primary'
            onClick={openAddExpensesModal} >
            Add Expenses
          </Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "1rem", alignItems: "center"
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expenses) => total + expenses.amount, 0)
            return (
              <BudgetCard
                key={budget.id}
                name="budget.name"
                amount={amount}
                max={budget.max}
                onAddExpensesClick={() => openAddExpensesModal(budget.id)}
              />
            )
          })}
          <UnCategorizedBudgetCard onAddExpensesClick={openAddExpensesModal} />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpensesModal show={showAddExpensesModal}
        defaultBudgetId={addExpensesModalBudgetId}
        handleClose={() => setShowAddExpensesModal(false)} />
    </>
  )
}

export default App
