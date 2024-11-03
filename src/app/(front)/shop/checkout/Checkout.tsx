"use client";
import InputText from "@/components/form/InputText";

const Checkout = () => {
  return (
    <div className="container flex gap-5 mt-10">
      <div className="basis-3/5 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-lg">Delivery information</div>
          <div className="bg-gray-100 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="basis-1/2">
                <InputText label="Name" placeholder="Your name" name="name" />
              </div>
              <div className="basis-1/2">
                <InputText
                  label="Mobile Number"
                  placeholder="Your mobile number"
                  value={`+46 7`}
                  name="mobile"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="basis-1/2">
                <InputText
                  label="Email"
                  placeholder="Your email"
                  name="email"
                />
              </div>
              <div className="basis-1/2">
                <InputText label="Region" placeholder="Region" name="mobile" />
              </div>
            </div>
          </div>
        </div>
        <div>Shipping alternatives</div>
        <div>Payments</div>
      </div>
      <div className="basis-2/5">List products</div>
    </div>
  );
};

export default Checkout;
