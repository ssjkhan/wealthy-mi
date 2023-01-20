import React from "react";
import Page from "../../components/page/Page";
import PageContent from "../../components/page-content/PageContent";
import PageHeader from "../../components/page-content/PageHeader";

import ExpenseTable from "./ExpenseTable";
import AddCategory from "./AddCategoryForm";
import AddExpense from "./AddExpenseForm";

export default function Expenses() {
  const userId = localStorage.getItem("user");

  return (
    <>
      <Page showTopbar={true}>
        <AddCategory />
        <AddExpense />
        <PageContent>
          <ExpenseTable userId={userId} />
        </PageContent>
      </Page>
    </>
  );
}