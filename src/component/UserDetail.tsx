import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";

const UserDetail = ({ selectedData, onClose }) => {
  if (!selectedData) return null;

  return (
    <Dialog open={!!selectedData} onOpenChange={onClose}>
      <DialogContent className="bg-white h-4/5 overflow-y-auto p-6 rounded-lg shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-gray-800">Credit Report Details</DialogTitle>
          <DialogDescription className="text-gray-600">
            Detailed credit report for <span className="font-semibold">{selectedData.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Name:</strong> {selectedData.name}</p>
            <p><strong>Mobile:</strong> {selectedData.mobilePhone}</p>
            <p><strong>PAN:</strong> {selectedData.pan}</p>
            <p><strong>Credit Score:</strong> <span className="text-green-600 font-semibold">{selectedData.creditScore}</span></p>
          </div>

          <h3 className="text-lg font-semibold border-b pb-2">Report Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Total Accounts:</strong> {selectedData.reportSummary?.totalAccounts}</p>
            <p><strong>Active Accounts:</strong> {selectedData.reportSummary?.activeAccounts}</p>
            <p><strong>Closed Accounts:</strong> {selectedData.reportSummary?.closedAccounts}</p>
            <p><strong>Current Balance:</strong> ₹{selectedData.reportSummary?.currentBalanceAmount}</p>
            <p><strong>Secured Loans:</strong> ₹{selectedData.reportSummary?.securedAccountsAmount}</p>
            <p><strong>Unsecured Loans:</strong> ₹{selectedData.reportSummary?.unsecuredAccountsAmount}</p>
            <p><strong>Credit Inquiries (Last 7 Days):</strong> {selectedData.reportSummary?.last7DaysCreditEnquiries}</p>
          </div>

          <h3 className="text-lg font-semibold border-b pb-2">Credit Accounts</h3>
          <div className="overflow-x-auto">
            <Table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-left">
                  <th className="p-2">Credit Card</th>
                  <th className="p-2">Bank</th>
                  <th className="p-2">Account Number</th>
                  <th className="p-2">Overdue Amount</th>
                  <th className="p-2">Current Balance</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.creditAccounts?.length > 0 ? (
                  selectedData.creditAccounts.map((account, index) => (
                    <tr key={index} className="border-t text-sm">
                      <td className="p-2">{account.creditCard}</td>
                      <td className="p-2">{account.bank}</td>
                      <td className="p-2">{account.accountNumber}</td>
                      <td className="p-2 text-red-500">₹{account.amountOverdue}</td>
                      <td className="p-2 text-green-600">₹{account.currentBalance}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 p-4">No credit account data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="secondary" onClick={onClose} className="px-6 py-2">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetail;
