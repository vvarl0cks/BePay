'use client';

import * as React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { mockAddressBook, mockCryptoBalances } from '@/lib/mockData';
import type { AddressEntry } from '@/lib/types';
import { BookUser, PlusCircle, Edit3, Trash2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AddressBookPage() {
  const [addresses, setAddresses] = React.useState<AddressEntry[]>(mockAddressBook);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [currentAddress, setCurrentAddress] = React.useState<AddressEntry | null>(null);
  const [copiedAddress, setCopiedAddress] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleAddAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAddress: AddressEntry = {
      id: String(Date.now()),
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      cryptoSymbol: formData.get('cryptoSymbol') as string,
      memo: formData.get('memo') as string | undefined,
    };
    setAddresses([...addresses, newAddress]);
    setIsAddDialogOpen(false);
    toast({ title: "Address Added", description: `${newAddress.name} has been added to your address book.` });
  };

  const handleEditAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentAddress) return;
    const formData = new FormData(event.currentTarget);
    const updatedAddress: AddressEntry = {
      ...currentAddress,
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      cryptoSymbol: formData.get('cryptoSymbol') as string,
      memo: formData.get('memo') as string | undefined,
    };
    setAddresses(addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr));
    setIsEditDialogOpen(false);
    setCurrentAddress(null);
    toast({ title: "Address Updated", description: `${updatedAddress.name} has been updated.` });
  };
  
  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({ title: "Address Deleted", description: `The address has been removed.`, variant: "destructive" });
  };

  const openEditDialog = (address: AddressEntry) => {
    setCurrentAddress(address);
    setIsEditDialogOpen(true);
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast({ title: "Copied!", description: "Address copied to clipboard." });
    setTimeout(() => setCopiedAddress(null), 2000);
  };


  return (
    <div>
      <PageHeader 
        title="Address Book" 
        description="Manage your frequently used cryptocurrency addresses." 
        icon={BookUser}
        action={
          <Button onClick={() => setIsAddDialogOpen(true)} className="shadow-md hover:shadow-lg transition-shadow">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Address
          </Button>
        }
      />

      {addresses.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <BookUser className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>Your Address Book is Empty</CardTitle>
            <CardDescription>Add addresses to easily send crypto.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add First Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((entry) => (
            <Card key={entry.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{entry.name}</CardTitle>
                    <CardDescription>{entry.cryptoSymbol} Address</CardDescription>
                  </div>
                  <Image 
                    src={`https://placehold.co/32x32.png?text=${entry.cryptoSymbol}`} 
                    alt={`${entry.cryptoSymbol} icon`}
                    width={32}
                    height={32}
                    className="rounded-full"
                    data-ai-hint={`crypto ${entry.cryptoSymbol} icon`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground break-all font-mono bg-muted/50 p-2 rounded-md">{entry.address}</p>
                {entry.memo && <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">Memo: {entry.memo}</p>}
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(entry.address)}>
                    {copiedAddress === entry.address ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copiedAddress === entry.address ? 'Copied' : 'Copy'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(entry)}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteAddress(entry.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>Enter the details for the new address.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddAddress}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" required className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">Address</Label>
                <Input id="address" name="address" required className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cryptoSymbol" className="text-right">Asset</Label>
                <Select name="cryptoSymbol" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCryptoBalances.map(crypto => (
                      <SelectItem key={crypto.id} value={crypto.symbol}>{crypto.name} ({crypto.symbol})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="memo" className="text-right">Memo (Optional)</Label>
                <Input id="memo" name="memo" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      {currentAddress && (
         <Dialog open={isEditDialogOpen} onOpenChange={(open) => { setIsEditDialogOpen(open); if (!open) setCurrentAddress(null);}}>
         <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
             <DialogTitle>Edit Address</DialogTitle>
             <DialogDescription>Update the details for this address.</DialogDescription>
           </DialogHeader>
           <form onSubmit={handleEditAddress}>
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-name" className="text-right">Name</Label>
                 <Input id="edit-name" name="name" defaultValue={currentAddress.name} required className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-address" className="text-right">Address</Label>
                 <Input id="edit-address" name="address" defaultValue={currentAddress.address} required className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-cryptoSymbol" className="text-right">Asset</Label>
                 <Select name="cryptoSymbol" defaultValue={currentAddress.cryptoSymbol} required>
                   <SelectTrigger className="col-span-3">
                     <SelectValue placeholder="Select asset" />
                   </SelectTrigger>
                   <SelectContent>
                     {mockCryptoBalances.map(crypto => (
                       <SelectItem key={crypto.id} value={crypto.symbol}>{crypto.name} ({crypto.symbol})</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-memo" className="text-right">Memo (Optional)</Label>
                 <Input id="edit-memo" name="memo" defaultValue={currentAddress.memo} className="col-span-3" />
               </div>
             </div>
             <DialogFooter>
               <DialogClose asChild>
                 <Button type="button" variant="outline">Cancel</Button>
               </DialogClose>
               <Button type="submit">Update Address</Button>
             </DialogFooter>
           </form>
         </DialogContent>
       </Dialog>
      )}

    </div>
  );
}

// Required for Image component for crypto icons
import Image from 'next/image';
