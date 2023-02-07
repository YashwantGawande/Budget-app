import { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpensesModal from "./components/AddExpensesModal";
import UnCategorizedBudgetCard from "./components/unCategorizedBudgetCard";
import BudgetCard from "./components/BudgetCard";
import { BudgetsProvider, unCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);
  const [viewExpensesModalId, setViewExpensesModalId] = useState();
  const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpensesModal(budgetId) {
    setShowAddExpensesModal(true);
    setAddExpensesModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horiZontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpensesModal}>
            Add Expenses
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expenses) => total + expenses.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name="budget.name"
                amount={amount}
                max={budget.max}
                onAddExpensesClick={() => openAddExpensesModal(budget.id)}
                onViewExpenseClick={() => setViewExpensesModalId(budget.id)}
              />
            );
          })}
          <UnCategorizedBudgetCard
            onAddExpensesClick={openAddExpensesModal}
            onViewExpenseClick={() => setViewExpensesModalId(unCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpensesModal
        show={viewExpensesModalId}
        defaultBudgetId={addExpensesModalBudgetId}
        handleClose={() => setShowAddExpensesModal(false)}
      />
      <ViewExpensesModal
        budgetId={showAddExpensesModal}
        handleClose={() => setViewExpensesModalId()}
      />
    </>
  );
}

export default App;
