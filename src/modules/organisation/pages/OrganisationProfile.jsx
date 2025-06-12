import { useParams } from "react-router-dom";
import useOrgStore from "@/store/orgStore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  CreditCard,
  Settings,
  Send,
  Edit,
  Save,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import SubHeader from "@/Layouts/SubHeader";
import SendInvitationDialog from "../components/org-profile/SendInvitationDialog";
const defaultOrganizationData = {
  id: "",
  OrgLogo: {
    url: "",
  },
  name: "",
  contactEmail: "",
  contactPhone: "",
  contactName: "",
  address: "",
  orgCity: "",
  orgState: "",
  orgCountry: "",
  timezone: "UTC",
  modules: [],
  users: [],
  billingPlan: {
    id: "",
    name: "",
    price: 0,
    features: [],
    maxUsers: 0,
    billingCycle: "",
    maxStorageGB: 0,
    trialDays: 0,
    permissions: [],
  },
};

export default function OrganizationProfile() {
  const { fetchCurrentOrgDetails, createInvite } = useOrgStore();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(defaultOrganizationData);
  const [isOwner, setIsOwner] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
 
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const loadOrganizationData = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        const response = await fetchCurrentOrgDetails(id);

        if (response?.organization) {
          setFormData({
            ...defaultOrganizationData,
            ...response.organization,
            billingPlan:
              response.organization.billingPlan ||
              defaultOrganizationData.billingPlan,
          });
          setIsOwner(response.isOwner || false);
        } else {
          throw new Error("Invalid organization data received");
        }
      } catch (error) {
        console.error("Failed to fetch organization details:", error);
        setFetchError(error.message || "Failed to load organization details");
        toast.error("Failed to load organization details");
      } finally {
        setLoading(false);
      }
    };

    loadOrganizationData();
  }, [id, fetchCurrentOrgDetails]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
      toast.success("Organization profile updated successfully.");
    } catch (error) {
      toast.error("Failed to update organization profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(defaultOrganizationData);
    setErrors({});
    setIsEditing(false);
  };


 

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

 

  const orgname = localStorage.getItem("orgName");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{fetchError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <SubHeader
        title={formData.name || "Organization"}
        btnLink={`/${orgname}/organisation/manage`}
        btnTitle={"Manage Organisation"}
      />

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-10 sm:px-30 lg:px-18">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={formData.OrgLogo?.url || "/placeholder.svg"}
                  alt={formData.name}
                />
                <AvatarFallback className="text-lg font-semibold">
                  {formData.name?.charAt(0)?.toUpperCase() || "O"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {formData.name || "Organization"}
                </h1>
                <p className="text-sm text-gray-500">
                  Organization ID: {formData.id || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isOwner && (
                <>
                  <Button variant="default" onClick={() => setShowInvite(true)}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Invitation
                  </Button>
                  <SendInvitationDialog
                    open={showInvite}
                    onClose={() => setShowInvite(false)}
                  setDisabled={setDisabled}
                  setShowInvite={setShowInvite}
                    disabled={disabled}
                  />
                </>
              )}
              {!isEditing ? (
                isOwner && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-25 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Organization Details */}
          <div className="lg:col-span-1 pl-15">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>About</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">Organization Name</Label>
                  {isEditing ? (
                    <div>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 capitalize mt-1">
                      {formData.name || "N/A"}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="contactEmail"
                    className="flex items-center space-x-1"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  {isEditing ? (
                    <div>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        className={errors.contactEmail ? "border-red-500" : ""}
                      />
                      {errors.contactEmail && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">
                      {formData.contactEmail || "N/A"}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="contactPhone"
                    className="flex items-center space-x-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </Label>
                  {isEditing ? (
                    <div>
                      <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          handleInputChange("contactPhone", e.target.value)
                        }
                        className={errors.contactPhone ? "border-red-500" : ""}
                      />
                      {errors.contactPhone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.contactPhone}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">
                      {formData.contactPhone || "N/A"}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contactName">Contact Person</Label>
                  {isEditing ? (
                    <div>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) =>
                          handleInputChange("contactName", e.target.value)
                        }
                        className={errors.contactName ? "border-red-500" : ""}
                      />
                      {errors.contactName && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.contactName}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 capitalize mt-1">
                      {formData.contactName || "N/A"}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Address</span>
                  </Label>
                  {isEditing ? (
                    <Textarea
                      value={`${formData.address || ""}, ${
                        formData.orgCity || ""
                      }, ${formData.orgState || ""}, ${
                        formData.orgCountry || ""
                      }`}
                      onChange={(e) => {
                        const parts = e.target.value.split(", ");
                        setFormData((prev) => ({
                          ...prev,
                          address: parts[0] || "",
                          orgCity: parts[1] || "",
                          orgState: parts[2] || "",
                          orgCountry: parts[3] || "",
                        }));
                      }}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 capitalize mt-1">
                      {formData.address || "N/A"}, {formData.orgCity || "N/A"},{" "}
                      {formData.orgState || "N/A"},{" "}
                      {formData.orgCountry || "N/A"}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Timezone</Label>
                  {isEditing ? (
                    <Select
                      value={formData.timezone}
                      onValueChange={(value) =>
                        handleInputChange("timezone", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Asia/Kolkata">
                          Asia/Kolkata
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          America/New_York
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          Europe/London
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">
                      {formData.timezone || "UTC"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                {isOwner && <TabsTrigger value="billing">Billing</TabsTrigger>}
                {isOwner && (
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                )}
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Banner</CardTitle>
                    <CardDescription>
                      Upload a banner image to represent your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop your banner image
                      </p>
                      <Button variant="outline" className="mt-4">
                        Upload Banner
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Modules</CardTitle>
                    <CardDescription>
                      Modules currently enabled for your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {formData.modules?.length > 0 ? (
                        formData.modules.map((module) => (
                          <Badge
                            key={module}
                            variant="secondary"
                            className="capitalize"
                          >
                            {module}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No active modules
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Team Members</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your organization's team members and their roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {formData.users?.length > 0 ? (
                        formData.users.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback>
                                  {user.firstName?.charAt(0)?.toUpperCase()}
                                  {user.lastName?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium capitalize">
                                  {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {user.email}
                                </p>
                                <p className="text-xs text-gray-400">
                                  Employee ID: {user.employeeId}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={
                                  user.role === "OrgAdmin"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {user.role}
                              </Badge>
                              <p className="text-xs text-gray-400 mt-1">
                                Joined:{" "}
                                {new Date(user.joinedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No users found</p>
                      )}
                    </div>

                    {isOwner && formData.billingPlan?.maxUsers && (
                      <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          You can have up to {formData.billingPlan.maxUsers}{" "}
                          users on your current plan. Currently using:{" "}
                          {formData.users?.length || 0}/
                          {formData.billingPlan.maxUsers}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Tab - Only for owners */}
              {isOwner && (
                <TabsContent value="billing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Billing Plan</span>
                      </CardTitle>
                      <CardDescription>
                        Manage your subscription and billing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {formData.billingPlan?.name ? (
                        <>
                          <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">
                                {formData.billingPlan.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-green-600 border-green-600"
                              >
                                Active
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Price</p>
                                <p className="font-medium">
                                  ${formData.billingPlan.price}/
                                  {formData.billingPlan.billingCycle}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Max Users</p>
                                <p className="font-medium">
                                  {formData.billingPlan.maxUsers}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Storage</p>
                                <p className="font-medium">
                                  {formData.billingPlan.maxStorageGB} GB
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Trial Days</p>
                                <p className="font-medium">
                                  {formData.billingPlan.trialDays}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Plan Features</h4>
                            <div className="space-y-2">
                              {formData.billingPlan.features?.length > 0 ? (
                                formData.billingPlan.features.map((feature) => (
                                  <div
                                    key={feature}
                                    className="flex items-center space-x-2"
                                  >
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm capitalize">
                                      {feature}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No features listed
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Permissions</h4>
                            <div className="space-y-2">
                              {formData.billingPlan.permissions?.length > 0 ? (
                                formData.billingPlan.permissions.map((perm) => (
                                  <div
                                    key={perm.module}
                                    className="flex items-center justify-between p-3 border rounded"
                                  >
                                    <span className="capitalize font-medium">
                                      {perm.module}
                                    </span>
                                    <div className="flex space-x-1">
                                      {perm.permissions?.map((permission) => (
                                        <Badge
                                          key={permission}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {permission}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No permissions listed
                                </p>
                              )}
                            </div>
                          </div>

                          <Button className="w-full">Upgrade Plan</Button>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No billing information available
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Settings Tab - Only for owners */}
              {isOwner && (
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Organization Settings</span>
                      </CardTitle>
                      <CardDescription>
                        Configure your organization preferences and security
                        settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">
                              Two-Factor Authentication
                            </Label>
                            <p className="text-sm text-gray-500">
                              Require 2FA for all organization members
                            </p>
                          </div>
                          <Switch />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">
                              Email Notifications
                            </Label>
                            <p className="text-sm text-gray-500">
                              Receive email notifications for important updates
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Public Profile</Label>
                            <p className="text-sm text-gray-500">
                              Make your organization profile visible to others
                            </p>
                          </div>
                          <Switch />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">API Access</Label>
                            <p className="text-sm text-gray-500">
                              Enable API access for third-party integrations
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <h4 className="font-medium text-red-600 mb-2">
                          Danger Zone
                        </h4>
                        <p className="text-sm text-gray-500 mb-4">
                          These actions cannot be undone. Please be careful.
                        </p>
                        <Button variant="destructive" className="w-full">
                          Delete Organization
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
