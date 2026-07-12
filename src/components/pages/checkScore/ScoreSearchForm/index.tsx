import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Button } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { searchSchema, SearchFormValues } from "../validation";
import { useRouterParams } from "../hooks/useRouterParams";

export default function ScoreSearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { sbd } = useRouterParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      sbd: sbd || "",
    },
  });

  useEffect(() => {
    reset({ sbd: sbd || "" });
  }, [sbd, reset]);

  const handleSearchSubmit = (values: SearchFormValues) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.sbd) {
      params.set("sbd", values.sbd);
    } else {
      params.delete("sbd");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Card bordered={false} className="shadow-xs border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">User Registration</h2>
      <form onSubmit={handleSubmit(handleSearchSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="sbd" className="text-gray-700 font-medium">
            Registration Number:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Controller
                name="sbd"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    allowClear
                    onChange={(e) => {
                      field.onChange(e);
                      const val = e.target.value;
                      if (!val) {
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete("sbd");
                        router.push(`${pathname}?${params.toString()}`);
                      }
                    }}
                    id="sbd"
                    placeholder="Enter registration number"
                    className={`h-10 text-base ${errors.sbd ? "border-red-500 hover:border-red-500" : ""}`}
                  />
                )}
              />
              {errors.sbd && (
                <span className="text-red-500 text-sm mt-1 block">{errors.sbd.message}</span>
              )}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black hover:bg-zinc-800 text-white font-medium border-none h-10 px-8 rounded-md transition-colors"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}

