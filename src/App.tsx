import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import BalanceSheetStatements from './pages/BalanceSheetStatements';
import CashFlowStatements from './pages/CashFlowStatements';
import CompanyFinancialStatements from './pages/CompanyFinancialStatements';
import Home from './pages/Home';
import IncomeStatements from './pages/IncomeStatements';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/stocks">
        <Route index element={<Home />} />
        <Route path=":symbol">
          <Route index element={<CompanyFinancialStatements />} />
          <Route path="income-statements" element={<IncomeStatements />} />
          <Route path="balance-sheet-statements" element={<BalanceSheetStatements />} />
          <Route path="cash-flow-statements" element={<CashFlowStatements />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/stocks" />} />
    </Routes>
  );
};

export default App;
